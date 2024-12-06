const db = require('./db')
const { v4: uuidv4 } = require('uuid');

async function main () {
  const username = process.argv[2]
  
  if (!username) throw new Error('Please add username in the first parameter')
  
  const user = await db.query('SELECT * FROM users WHERE username = $1', [username])
  
  if (user.rows.length > 0) {
    throw new Error('username already registered')
  }
  
  const id = uuidv4()
  await db.query('INSERT INTO users(id, username) VALUES ($1, $2)', [id, username])
  
  console.log('New username created!')
  
  process.exit(1)
}

main()

