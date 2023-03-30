const events = require('events');

class DB extends events.EventEmitter {
   
   db = [ 
         {id: 1 ,
            name: 'VasilisaKa',
            date: '21.12.2001' } , 

         {id: 2 ,
            name: 'VasilisaK',
            date: '21.12.2001' } , 

         {id: 3 ,
            name: 'VasilisaKS', 
            date: '21.12.2001' } ,
     ];

     select = () => {
        return Promise.resolve(this.db);
     };

     insert = (obj) => {
         var npos = this.db.find(x => x.id == obj.id);
         
         if(npos){
            return Promise.reject("Error");    
         }

         this.db.push(obj);

         return  Promise.resolve(this.obj);
     }
     
     update = (obj) => {
         var npos = this.db.find(x => x.id == obj.id);

         if(!npos){
            return Promise.reject("Error");
         }

         this.db.splice(this.db.indexOf(npos),1, obj);

         return Promise.resolve(this.obj);
     }
     
     delete = (id) => {
        var npos = this.db.find(x => x.id == id );

        if(!npos){
           return Promise.reject("Error");
        }

        this.db.splice(this.db.indexOf(npos),1);

        return Promise.resolve(this.npos);
     }
}

module.exports = new DB();