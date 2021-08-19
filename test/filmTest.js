const supertest = require("supertest");
const assert = require('assert');
const chai = require('chai');
const should = chai.should();
const app = require("../index");
const {
    array
} = require("@hapi/joi");

const newUser = {
    name: 'aditya91',
    email: 'majeti.aditya91@gmail.com',
    password: '123456'
};

const loginUser = {
    email: newUser.email,
    password: newUser.password,
    grant_type: 'password'
};

describe('/api/user/register', function () {
    describe("POST", () => {
        it("it should has status code 422 when Input required", async () => {
            const result = await supertest(app)
                .post("/api/user/register")                
                .send({})

            result.status.should.equal(422)
            result.text.should.be.equal('\"name\" is required')
        });

        it("it should has status code 422 when name required", async () => {
            const result = await supertest(app)
                .post("/api/user/register")               
                .send({
                    "email": "aditya@gmail.com",
                    "password": "123456"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"name\" is required')
        });

        it("it should has status code 422 when email required", async () => {
            const result = await supertest(app)
                .post("/api/user/register")
                .send({
                    "name": "aditya",
                    "password": "123456"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"email\" is required')
        });

        it("it should has status code 422 when password required", async () => {
            const result = await supertest(app)
                .post("/api/user/register")
                .send({
                    "name": "aditya",
                    "email": "aditya@gmail.com"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"password\" is required')
        });

        it("it should has status code 200 when User created successfully", async () => {
            const result = await supertest(app)
                .post("/api/user/register")
                .send(newUser)

            result.status.should.equal(200)
        });
    });
});

describe('/api/user/login', function () {
    describe("POST", () => {
        it("it should has status code 422 when Input required", async () => {
            const result = await supertest(app)
                .post("/api/user/login")                
                .send({})

            result.status.should.equal(422)
            result.text.should.be.equal('\"email\" is required')
        });

        it("it should has status code 422 when email required", async () => {
            const result = await supertest(app)
                .post("/api/user/login")
                .send({
                    "password": "123456",
                    "grant_type": "password"                
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"email\" is required')
        });

        it("it should has status code 422 when password required", async () => {
            const result = await supertest(app)
                .post("/api/user/login")
                .send({
                    "email": "aditya@gmail.com",
                    "grant_type": "password"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"password\" is required')
        });

        it("it should has status code 422 when grant_type required", async () => {
            const result = await supertest(app)
                .post("/api/user/login")               
                .send({
                    "email": "aditya@gmail.com",
                    "password": "123456"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"grant_type\" is required')
        });

        it("it should has status code 200 when User login successfully", async () => {
            const result = await supertest(app)
                .post("/api/user/login")
                .send(loginUser)

            result.status.should.equal(200)
        });
    });
});

describe('/api/films', function () {
    let LoginUserRes = {}
    it("it should has status code 200 when User login successfully", async () => {
        const result = await supertest(app)
        .post("/api/user/login")
        .send(loginUser)        

        LoginUserRes = JSON.parse(JSON.parse(JSON.stringify(result)).text)        
    });

    describe("POST", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .post("/api/films")

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied')
        });

        it("it should has status code 422 when Input required", async () => {
            const result = await supertest(app)
                .post("/api/films")
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({})

            result.status.should.equal(422)
            result.text.should.be.equal('Input required')
        });

        it("it should has status code 422 when name required", async () => {
            const result = await supertest(app)
                .post("/api/films")
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "description": "The Lord of the Rings",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 4,
                    "filmPrice": 150,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"name\" is required')
        });

        it("it should has status code 422 when description required", async () => {
            const result = await supertest(app)
                .post("/api/films")
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "name": "The Lord of the Rings",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 4,
                    "filmPrice": 150,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"description\" is required')
        });

        it("it should has status code 422 when realeaseDate required", async () => {
            const result = await supertest(app)
                .post("/api/films")
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "name": "The Lord of the Rings",
                    "description": "The Lord of the Rings",
                    "rating": 4,
                    "filmPrice": 150,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"realeaseDate\" is required')
        });

        it("it should has status code 422 when rating required", async () => {
            const result = await supertest(app)
                .post("/api/films")
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "name": "The Lord of the Rings",
                    "description": "The Lord of the Rings",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "filmPrice": 150,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"rating\" is required')
        });

        it("it should has status code 422 when filmPrice required", async () => {
            const result = await supertest(app)
                .post("/api/films")
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "name": "The Lord of the Rings",
                    "description": "The Lord of the Rings",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 4,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"filmPrice\" is required')
        });

        it("it should has status code 422 when country required", async () => {
            const result = await supertest(app)
                .post("/api/films")
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "name": "The Lord of the Rings",
                    "description": "The Lord of the Rings",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 4,
                    "filmPrice": 150,
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"country\" is required')
        });

        it("it should has status code 422 when photo required", async () => {
            const result = await supertest(app)
                .post("/api/films")
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "name": "The Lord of the Rings",
                    "description": "The Lord of the Rings",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 4,
                    "filmPrice": 150,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"]
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"photo\" is required')
        });

        it("it should has status code 200 when film created successfully", async () => {
            const result = await supertest(app)
                .post("/api/films")
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "name": "The Lord of the Rings",
                    "description": "The Lord of the Rings",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 4,
                    "filmPrice": 150,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(200)
        });

        it("it should has status code 200 when multiple films created successfully", async () => {
            const result = await supertest(app)
                .post("/api/films")
                .set({ "Authorization": LoginUserRes.access_token })
                .send([{
                    "name": "The Lord of the Rings",
                    "description": "The Lord of the Rings",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 4,
                    "filmPrice": 150,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                }, {
                    "name": "The Dark Knight",
                    "description": "The Dark Knight",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 5,
                    "filmPrice": 200,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                }])

            result.status.should.equal(200)                
        });
    });

    describe("GET", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .get("/api/films")

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied')
        });

        it("it should has status code 200 when return response", async () => {
            const result = await supertest(app)
                .get("/api/films")
                .set({
                    "Authorization": LoginUserRes.access_token
                })

            result.status.should.equal(200)
        });
    });
});

describe("/api/films/:id", () => {
    let LoginUserRes = {}
    it("it should has status code 200 when User login successfully", async () => {
        const result = await supertest(app)
        .post("/api/user/login")
        .send(loginUser)        

        LoginUserRes = JSON.parse(JSON.parse(JSON.stringify(result)).text)        
    });

    let filmObj = {}
    it("it should create test film", async () => {
        const result = await supertest(app)
            .post("/api/films")
            .set({
                "Authorization": LoginUserRes.access_token
            })
            .send({
                "name": "The Godfather",
                "description": "The Godfather",
                "realeaseDate": "2021-07-05T08:00:00",
                "rating": 5,
                "filmPrice": 200,
                "country": "USA",
                "genre": ["Novel", "Fantasy Fiction"],
                "photo": "url"
            })

        filmObj = JSON.parse(JSON.parse(JSON.stringify(result)).text)
    });

    describe("GET", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .get(`/api/films/${filmObj._id}`)

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied')
        });

        it("it should has status code 200 when return response", async () => {
            const result = await supertest(app)
                .get(`/api/films/${filmObj._id}`)
                .set({
                    "Authorization": LoginUserRes.access_token
                })

            result.status.should.equal(200)
        });
    });

    describe("PUT", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .put(`/api/films/${filmObj._id}`)

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied')
        });

        it("it should has status code 422 when _id required", async () => {
            const result = await supertest(app)
                .put(`/api/films/${filmObj._id}`)
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "name": "The Godfather",
                    "description": "The Godfather",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 5,
                    "filmPrice": 200,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"_id\" is required')
        });

        it("it should has status code 422 when name required", async () => {
            const result = await supertest(app)
                .put(`/api/films/${filmObj._id}`)
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "_id": filmObj._id,
                    "description": "The Godfather",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 5,
                    "filmPrice": 200,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"name\" is required')
        });

        it("it should has status code 422 when description required", async () => {
            const result = await supertest(app)
                .put(`/api/films/${filmObj._id}`)
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "_id": filmObj._id,
                    "name": "The Godfather",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 5,
                    "filmPrice": 200,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"description\" is required')
        });

        it("it should has status code 422 when realeaseDate required", async () => {
            const result = await supertest(app)
                .put(`/api/films/${filmObj._id}`)
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "_id": filmObj._id,
                    "name": "The Godfather",
                    "description": "The Godfather",
                    "rating": 5,
                    "filmPrice": 200,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"realeaseDate\" is required')
        });

        it("it should has status code 422 when rating required", async () => {
            const result = await supertest(app)
                .put(`/api/films/${filmObj._id}`)
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "_id": filmObj._id,
                    "name": "The Godfather",
                    "description": "The Godfather",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "filmPrice": 200,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"rating\" is required')
        });

        it("it should has status code 422 when filmPrice required", async () => {
            const result = await supertest(app)
                .put(`/api/films/${filmObj._id}`)
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "_id": filmObj._id,
                    "name": "The Godfather",
                    "description": "The Godfather",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 5,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"filmPrice\" is required')
        });

        it("it should has status code 422 when country required", async () => {
            const result = await supertest(app)
                .put(`/api/films/${filmObj._id}`)
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "_id": filmObj._id,
                    "name": "The Godfather",
                    "description": "The Godfather",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 5,
                    "filmPrice": 200,
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"country\" is required')
        });

        it("it should has status code 422 when photo required", async () => {
            const result = await supertest(app)
                .put(`/api/films/${filmObj._id}`)
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "_id": filmObj._id,
                    "name": "The Godfather",
                    "description": "The Godfather",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 5,
                    "filmPrice": 200,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"]
                })

            result.status.should.equal(422)
            result.text.should.be.equal('\"photo\" is required')
        });

        it("it should has status code 200 when return response", async () => {
            const result = await supertest(app)
                .put(`/api/films/${filmObj._id}`)
                .set({
                    "Authorization": LoginUserRes.access_token
                })
                .send({
                    "_id": filmObj._id,
                    "name": "The Godfather",
                    "description": "The Godfather",
                    "realeaseDate": "2021-07-05T08:00:00",
                    "rating": 5,
                    "filmPrice": 200,
                    "country": "USA",
                    "genre": ["Novel", "Fantasy Fiction"],
                    "photo": "url"
                })

            result.status.should.equal(200)
        });
    });

    describe("Delete", () => {
        it("it should has status code 401 unauthorized", async () => {
            const result = await supertest(app)
                .delete(`/api/films/${filmObj._id}`)

            result.status.should.equal(401)
            result.text.should.be.equal('Access Denied')
        });

        it("it should has status code 200 when return response", async () => {
            const result = await supertest(app)
                .delete(`/api/films/${filmObj._id}`)
                .set({
                    "Authorization": LoginUserRes.access_token
                })

            result.status.should.equal(200)
        });
    });
});
