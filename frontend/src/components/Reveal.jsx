import { motion } from 'framer-motion'
export default function Reveal({ children, delay = 0, ...p }) {
  return <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: .7, delay, ease: [.22, 1, .36, 1] }} {...p}>{children}</motion.div>
}
