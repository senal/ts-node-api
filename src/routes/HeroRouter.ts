import {Router, Request, Response, NextFunction} from 'express';
const  Heroes = require('../../data');

export class HeroRouter {
    router: Router;

    constructor(){
        this.router = Router();
        this.init();
    }

    // Get all Heroes
    getAll(req: Request, res: Response, next: NextFunction){
        res.send(Heroes)
    }

    // Get one hero
    getOne(req: Request, res: Response, next: NextFunction){
        let id = parseInt(req.params.id);
        let hero = Heroes.find(hero => hero.id === id);
        
        if(hero){
            res.status(200).send({
                message: 'Success',
                status: res.status,
                hero           
            });
        } 
        else {
            res.status(404).send({
                message: 'No hero found with the given id.',
                status: res.status
            });
        }
    }

    add(req: Request, res: Response, next: NextFunction){
        let name = req.body.name;
        let age = req.body.age;
       
        if(name && age){
            res.status(200).send({
                message: 'Success',
                status: res.status,
                body: {errorCode: 0}
            });
        }else{
            res.status(203).send({
                message: 'Failed',
                status: res.status,
                body: {errorCode: 1}
            });
        }
        
    }

    put(req: Request, res: Response, next: NextFunction){
        let id = parseInt(req.body.id);
        let name = req.body.name;
        let age = req.body.age;
        
        let hero = Heroes.find(hero => hero.id === id);
        if(hero){
            console.log(`ID ${id}`);
            hero.name = name;
             res.status(200).send({
                 message: 'Success',
                 status: res.status,
                 hero
             });   
        }
        else {
            res.status(404).send({
                message: 'not found',
                status: res.status
            });    
        }
    }

    init(){
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.add);
        this.router.put('/', this.put);
    }

}

const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;   
