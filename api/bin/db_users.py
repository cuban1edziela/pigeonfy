import sqlite3


class Database:
    def __init__(self, db):
        self.conn = sqlite3.connect(db)
        self.cur = self.conn.cursor()
        self.cur.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name text, surname text, email, password)")
        self.conn.commit()

    def fetch(self):
        self.cur.execute("SELECT * FROM users")
        rows = self.cur.fetchall()
        return rows

    def insert(self, name, surname, email, password ):
        self.cur.execute("INSERT INTO users VALUES (NULL, ?, ?, ?, ?)", (name, surname, email, password))
        self.conn.commit()

    def remove(self, id):
        self.cur.execute("DELETE FROM users WHERE id=?", (id,))
        self.conn.commit()

    def update(self, id, name, surname, email, password):
        self.cur.execute("UPDATE users SET name = ?, surname = ?, n = ?, e = ? WHERE id = ?", (name, surname, email, password, id))
        self.conn.commit()

    def __del__(self):
        self.conn.close()


# db = Database("users.db")
# db.insert("Conor", "Sheridan", "conor.sheridan@gmail.com", "qwerty")
# db.insert("Kuba", "Niedziela", "kubaniedziela.zg@gmail.com", "dupencja1")


