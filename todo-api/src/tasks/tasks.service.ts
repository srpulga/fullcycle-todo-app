import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tasks } from './tasks.model';
import { taskDTO } from './dto/tasks.dto';


@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Tasks) private tasksModel: typeof Tasks
    ){}
    
    async findAll(): Promise<Tasks[]>{
        return await this.tasksModel.findAll();
    }
    
    async findByUser(userId,done?): Promise<Tasks[]>{ // missing type
        let isDone 
        return await this.tasksModel.findAll({
            where:{
                userId:userId
            }
        });
    }

    async create(task): Promise<Tasks>{ // here you do the validations: user exists ? task is valid ? because whats happen if the user is not found?
        return this.tasksModel.create(task)
    }

    async setAsDone(taskId,userId,setAsDone){ // missing type
        return this.tasksModel.update({
            done:setAsDone
        },{
            where:{
                id:taskId,
                userId:userId
            }
        })
    }

    // async deleteOne(id): Promise<object|undefined>{
    //     const user = await this.tasksModel.findOne({
    //         where:{
    //             id:id
    //         }
    //     })

    //     if(!user){
    //         throw Error('User not found.');
    //     }

    //     const rowsDeleted = await this.tasksModel.destroy({
    //         where: {
    //             id:id,
    //             // userId:userId
    //         }
    //     })

    //     if(rowsDeleted>0){
    //         return {
    //             message: `User ${user?.dataValues.name} has deleted.`
    //         }
    //     }
    // }
}
