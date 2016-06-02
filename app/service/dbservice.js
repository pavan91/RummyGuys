import {Storage, SqlStorage} from 'ionic-angular';


export class DBService{
    
    constructor(){
        this.storage = new Storage(SqlStorage);
        this.storage.query('create table if not exists tbltasks (id integer primary key autoincrement, task text, priority text, status text, round integer, tpoints integer, points integer)');
    }

     getTasks(id){
        if (id === undefined){
            return this.storage.query("select * from tbltasks");
        }else{
            return this.storage.query("select * from tbltasks where id = " + id);
        }
        
    }
    
    saveTask(id, item){
        if(id === undefined){
            return this.storage.query("insert into tbltasks (task, priority, status, round, tpoints, points) values ('" + item.task + "', '" + item.priority + "', 'pending',0,0,0)");
        }else{
            return this.storage.query("update tbltasks set task = '" + item.task + "', priority = '" + item.priority + "' where id =" + id);
        }
        
    }
    
    
    saveRound(id, item){
       
            return this.storage.query("update tbltasks set tpoints = '" + item.tpoints + "', points = '" + item.points + "' where id =" + id);
        
        
    }
    
     delTask(id){
        return this.storage.query("delete from tbltasks where id =" + id);
    }
    
    
    doneTask(id, status){
        if(status == 'pending'){
            status = 'done';
        }else{
            status = 'pending';
        }
        return this.storage.query("update tbltasks set status = '" + status + "' where id =" + id);
    }
    
    
}