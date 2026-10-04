import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import {pool} from '../src/config/db.js'

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const migrationDir=path.join(__dirname,'../migrations');

async function migrate(){
    const client=await pool.connect();
    try{
        await client.query("BEGIN");

        await client.query(`
            CREATE TABLE IF NOT EXISTS migrations(
                id SERIAL PRIMARY KEY,
                filename VARCHAR(225) UNIQUE NOT NULL,
                executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );
            `);
        const files=(await fs.readdir(migrationDir)).filter(file => file.endsWith('.sql')).sort();
        for(const file of files){
            const AlreadyExecuted=await client.query('SELECT 1 FROM migrations WHERE filename=$1',[file]);
            if(AlreadyExecuted.rowCount>0){
                console.log(`Skipping the File:${file}`);
                continue;
            }
            const filePath=path.join(migrationDir,file);
            const sql= await fs.readFile(filePath,'utf8');
            await client.query(sql);
            await client.query(` INSERT INTO migrations(filename) VALUES($1)`,[file]);    
        }
        await client.query("COMMIT");
        console.log("Databse migrations completed");
    }
    catch(error){
        console.log(`The error:${error.message}`);
        await client.query("ROLLBACK");
    }
    finally{
        client.release();
    }
}
migrate();