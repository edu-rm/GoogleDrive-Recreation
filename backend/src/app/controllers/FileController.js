import File from '../models/File';

class FileController {
  async store(req, res){

    // const file = await File.create({ path, user_id, folder_id });
    console.log(req.file);
    return res.json({ msg: 'Success' });
  }

  async index(req,res){
    // Listar todos os arquivos presentes na pasta X
    const { folder_id, user_id } = req.query;

  }

}

export default FileController;