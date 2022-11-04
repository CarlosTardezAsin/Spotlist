import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { getEnvironment } from './configs/env-selector';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { PingService } from './services/ping-service';
import TYPES from './constants/types-constants';

//Import controllers
import './controllers/ping-controller';

getEnvironment();

let container = new Container();

//Bind services
container.bind<PingService>(TYPES.PingService).to(PingService);

let server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cors())
    app.use(bodyParser.json());
});

const serverInstance = server.build();

export default serverInstance
