const request = require('supertest');
const app = require('../app');
const fs = require("fs");
const eceptedById = 
    
{
    name : "daniel",
    lastName : "eliyho",
    email : "danieleliyho@gmail.com"
}
const requestBodyPut =
    {
        "name": "Michael",
        "lastName": "Efraim",
        "Email": "michefraim@gmail.com"
    };

    const expectedByPut =
    {
        "body":
        {
            "name": "Michael",
            "lastName": "Efraim",
            "Email": "michefraim@gmail.com"
        },
        "id": 'c9448ca7-3277-4414-ad67-d3d42a0b1b6d',
        "message": 'Success'
    }

describe('get a fail by id',()=>{


it('can get a bin by id',async()=>{
   const response = await request(app).get('/api/v3/b/c9448ca7-3277-4414-ad67-d3d42a0b1b6d');
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("daniel")
    expect(response.body.lastName).toEqual('eliyho')
    expect(response.body.email).toEqual('danieleliyho@gmail.com') 
});
it('if an illegal id is requested',async()=>{
    const response = await request(app).get('/api/v3/b/c9448ca7-3277-4414-ad67-d3d42a0b1b6');
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual( "illegal id");
})
it('if the id, not found it',async()=>{
    const response = await request(app).get('/api/v3/b/c9448ca7-3277-4414-ad67-d3d42a0b1b6h');
    expect(response.status).toBe(404);
    expect(response.body.message).toEqual( "Bad ID, not found");
})
});
describe('post a fail by id',()=>{
    
    const expectedPostBody =     { "body" :{
    
        name : "daniel",
        lastName : "eliyho",
        email : "danieleliyho@gmail.com"
        },
    }    
    it('can get a bin by id',async()=>{

        const response = await request(app).post('/api/v3/b').send(eceptedById);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedPostBody);
        

    });
    });
    describe('put a fail by id',()=>{
        const lenFileBefore = fs.readdirSync('./jsonFiles').length;
        it('it can update a bin by id',async()=>{

            const response = await request(app).put('/api/v3/b/c9448ca7-3277-4414-ad67-d3d42a0b1b6d').send(requestBodyPut);
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedByPut);
        })
        it(`when succssfully puts, shouldn't creat a new file`,async ()=>{
            const response = await request(app).put('/api/v3/b/c9448ca7-3277-4414-ad67-d3d42a0b1b6d').send(eceptedById);
            const lenFileAfter = fs.readdirSync('./jsonFiles').length;
            expect(lenFileBefore).toBe(lenFileAfter - 1);
        });
        it('if an illegal id is requested',async()=>{
            const response = await request(app).put('/api/v3/b/c9448ca7-3277-4414-ad67-d42a0b1b6').send(eceptedById);
            expect(response.status).toBe(400);
            expect(response.body.message).toEqual( "illegal id");
        })
        it('if the id, not found it',async()=>{
            const response = await request(app).put('/api/v3/b/c9448ca7-3437-4414-ad67-d3d42a0b1b6d').send(eceptedById);
            expect(response.status).toBe(404);
            expect(response.body.message).toEqual( "File not found");
        })
    });
    describe('delet',()=>{

        let fileExists = true;
        it('can get a bin by id',async()=>{
           const response = await request(app).delete('/api/v3/b/6cd3e727-c640-4143-be67-0b29ff235319');
            fileExists = fs.existsSync(`./jsonFiles/6cd3e727-c640-4143-be67-0b29ff235319.json`);
            expect(fileExists).toBe(false)
        });
        it('if an illegal id is requested',async()=>{
            const response = await request(app).delete('/api/v3/b/c9448ca7-3277-ad67-d3d42a0b1b6');
            expect(response.status).toBe(400);
            expect(response.body.message).toEqual( "illegal id");
        })
        it('if the id, not found it',async()=>{
            const response = await request(app).delete('/api/v3/b/c9448ca7-3277-4414-ad67-d3d42a0b1b6h');
            expect(response.status).toBe(404);
            expect(response.body.message).toEqual( "File not found");
        })
        });