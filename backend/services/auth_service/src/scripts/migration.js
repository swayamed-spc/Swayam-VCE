import fs from 'fs/promises';
import {pool} from '../config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const migrationsDirectory = path.join(__dirname,"../migrations");


async function migrate (){
    const client= await pool.connect();
    try{
        await client.query("BEGIN");
        
        await client.query(
            `
            CREATE TABLE IF NOT EXISTS migrations(
                id SERIAL PRIMARY KEY,
                filename VARCHAR(25) UNIQUE NOT NULL,
                executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            
            );
            `
        )
        const files=(await fs.readdir(migrationsDirectory)).filter(file=>file.endsWith('.sql')).sort()
        for(const file of files){
            const alreadyExecuted= await client.query(
                `SELECT 1 FROM migrations WHERE filename=$1`,
                [file]
            )
            if(alreadyExecuted.rowCount>0){
                console.log(`Skipping ${file}`);
                continue;
            }
            const filePath=path.join(migrationsDirectory,file);
            const sql=await fs.readFile(filePath,"utf8");
            console.log(`Running ${file}`);
            await client.query(sql);
            await client.query(
                `INSERT INTO migrations(filename) VALUES($1)`,[file] 
            )
        }
        await client.query("COMMIT");
        console.log("Database migration Completed");
    }
    catch(error){
        await client.query("ROLLBACK");
        console.log(`Migration Failed:${error.message}`);
    }
    finally{
        client.release();              
    }
}
migrate();
