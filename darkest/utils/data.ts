import fs from 'fs';

class JsonEditor {
    async readData(filename: string) {
      try {
        const data = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
      } catch(e) {
        console.log("[DATA]: Error occurred here: ", e);
        throw e;
      }
      
    }
    
    async writeData(filename: string, data: any) {
        fs.writeFileSync(filename, JSON.stringify(data));
    }
}

const editor = new JsonEditor();
export default editor;