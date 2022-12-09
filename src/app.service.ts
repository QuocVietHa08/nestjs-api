import { Injectable } from '@nestjs/common';
import { readFileSync, writeFile } from 'fs';
import { join } from 'path';
import { Todo } from './interface/todo.interface';

const FILE_DIR = join(process.cwd(), '/src/', 'data.json');

@Injectable()
export class AppService {
  getFileContent(): Todo[] {
    const fileContent = readFileSync(FILE_DIR, { encoding: 'utf-8' });
    return JSON.parse(fileContent);
  }

  getAllTodos() {
    const result = this.getFileContent();
    return {
      status: 200,
      data: result || [],
      length: result.length || 0,
    };
  }

  getSingleTodo(id): any {
    const result = this.getFileContent();
    const todo = result.find((todo) => todo.id.toString() === id.toString());
    if (!todo) {
      return {
        status: 400,
        message: 'Not Found',
      };
    }
    return {
      status: 200,
      data: todo,
    };
  }

  deleteTodo(id): any {
    const fileContent = this.getFileContent();
    const deleteTodo = fileContent.find(
      (todo) => todo.id.toString() === id.toString(),
    );
    if (!deleteTodo) {
      return {
        status: 400,
        message: 'No todo found',
      };
    }
    const result = fileContent.filter((item) => item.id !== deleteTodo.id);
    writeFile(FILE_DIR, JSON.stringify(result), function writeJSON(err) {
      if (err) return console.log(err);
    });
    return {
      status: 200,
      message: 'Delete Todo successfull',
    };
  }

  addTodo(body) {
    try {
      const fileContent = this.getFileContent();
      const result = [...fileContent, body];
      writeFile(FILE_DIR, JSON.stringify(result), function writeJSON(err) {
        if (err) return console.log(err);
      });
      return {
        status: 200,
        message: 'Add todo successful',
      };
    } catch (err) {
      console.log('err:', err);
    }
  }

  editTodo(body, id) {
    try {
      console.log(body);
      const fileContent = this.getFileContent();
      console.log('file before:', fileContent);
      const editTodoIndex = fileContent.findIndex(
        (todo) => todo.id.toString() === id.toString(),
      );
      if (editTodoIndex < 0) {
        return {
          status: 400,
          message: 'Not found todo',
        };
      }
      fileContent[editTodoIndex] = body;
      writeFile(FILE_DIR, JSON.stringify(fileContent), function writeJSON(err) {
        if (err) return console.log(err);
      });

      return {
        status: 200,
        message: 'Update todo successful',
      };
    } catch (err) {
      console.log(err);
    }
  }

  completeTodo(id) {
    try {
      const fileContent = this.getFileContent();
      const completeTodoIndex = fileContent.findIndex(
        (todo) => todo.id.toString() === id.toString(),
      );
      fileContent[completeTodoIndex] = {
        ...fileContent[completeTodoIndex],
        status: 'done',
      };
      writeFile(FILE_DIR, JSON.stringify(fileContent), function writeJSON(err) {
        if (err) return console.log(err);
      });
    } catch (err) {
      console.log('err:', err);
    }
  }
}
