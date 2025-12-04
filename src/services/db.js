import * as SQLite from 'expo-sqlite';

// Abre (ou cria) o banco de dados
const db = SQLite.openDatabaseSync('devmanager.db');

export const initDB = () => {
  // Cria a tabela se não existir
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      concluido INTEGER DEFAULT 0
    );
  `);
};

// Adicionar Tarefa
export const addTarefa = (titulo) => {
  const result = db.runSync('INSERT INTO tarefas (titulo, concluido) VALUES (?, 0)', [titulo]);
  return result.lastInsertRowId;
};

// Listar Tarefas
export const getTarefas = () => {
  const allRows = db.getAllSync('SELECT * FROM tarefas ORDER BY id DESC');
  return allRows;
};

// Deletar Tarefa
export const deleteTarefa = (id) => {
  db.runSync('DELETE FROM tarefas WHERE id = ?', [id]);
};

// Alternar Status (Concluído/Pendente)
export const toggleTarefa = (id, statusAtual) => {
  const novoStatus = statusAtual === 1 ? 0 : 1;
  db.runSync('UPDATE tarefas SET concluido = ? WHERE id = ?', [novoStatus, id]);
};