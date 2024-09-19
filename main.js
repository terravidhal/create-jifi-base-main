const { express, response, configs, ALLOWED_METHODS, path, morgan } = require('./configs/app.config');

const cors = require('cors');
const routes = require('./routes/routes');
const db = require('./configs/database.config');
const swagger = require('./docs/swagger');

const app = express();
if (configs.use('database')) db.connect(configs.getDatabase());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('combined'));

// const logInterceptor = require("./utils/interceptors/logs.interceptor");
// app.use(logInterceptor.captureResponseBody);
// app.use(logInterceptor.logInterceptor);

routes.forEach(route => {

    try {

        const prefix = configs.getPrefixRoutes();
        const newRouter = require(`./routes/${route.route}.route`);
        app.use(prefix + route.path, newRouter);
    } catch (error) {

        throw new Error(`router error: ${error.message}`);
    }
});

swagger(app);

app.use((req, res, next) => {

    if (!ALLOWED_METHODS.includes(req.method)) {

        return response.failed(res, next, `${req.method} method not allowed.`, null, 405);
    }

    next();
});

app.use((req, res, next) => {

    return response.notFound(res, next, 'Endpoint not found, please verify your request !!!', {
        protocol: req.protocol,
        method: req.method.toUpperCase(),
        host: req.get('host'),
        url: req.originalUrl
    });
});

app.use((error, req, res, next) => {

    return response.internalError(res, next, error);
});

app.listen(configs.getPort(), () => {

    console.log(`Application running on: ${configs.getUrl()}`);
});