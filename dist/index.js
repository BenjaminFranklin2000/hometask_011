
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videos = exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const port = process.env.PORT || 5000;
const errorsMessage = {
    errorsMessages: []
};
exports.videos = [];
exports.app.get('/videos', (req, res) => {
    return res.status(200).send(exports.videos);
});
exports.app.post('/videos', (req, res) => {
    var _a;
    if (!req.body.title || typeof req.body.title !== 'string' || req.body.title.length > 40 || !req.body.title.trim()) {
        errorsMessage.errorsMessages.push({
            message: 'The title has incorrect values',
            field: 'title'
        });
    }
    if (!req.body.author || typeof req.body.author !== 'string' || req.body.author.length > 20 || !req.body.author.trim()) {
        errorsMessage.errorsMessages.push({
            message: 'The author has incorrect values',
            field: 'author'
        });
    }
    if (req.body.availableResolutions && req.body.availableResolutions.length) {
        const availableResolutionsArray = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
        for (let i = 0; i < req.body.availableResolutions.length; i++) {
            if (!availableResolutionsArray.includes(req.body.availableResolutions[i])) {
                errorsMessage.errorsMessages.push({
                    message: 'The available resolution has incorrect values',
                    field: 'availableResolutions'
                });
            }
        }
    }
    if (errorsMessage.errorsMessages.length) {
        res.status(400).send(errorsMessage);
        errorsMessage.errorsMessages.length = 0;
        return;
    }
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: (_a = req.body.availableResolutions) !== null && _a !== void 0 ? _a : ['P144']
    };
    exports.videos.push(newVideo);
    return res.status(201).send(newVideo);
});
exports.app.get('/videos/:id', (req, res) => {
    let video = exports.videos.find(p => p.id === +req.params.id);
    if (video) {
        return res.status(200).send(video);
    }
    return res.sendStatus(404);
});
exports.app.put('/videos/:id', (req, res) => {
    var _a;
    let video = exports.videos.find(p => p.id === +req.params.id);
    if (!video) {
        return res.sendStatus(404);
    }
    if (!req.body.title || typeof req.body.title !== 'string' || req.body.title.length > 40 || !req.body.title.trim()) {
        errorsMessage.errorsMessages.push({
            message: 'The title has incorrect values',
            field: 'title'
        });
    }
    if (!req.body.author || typeof req.body.author !== 'string' || req.body.author.length > 20 || !req.body.author.trim()) {
        errorsMessage.errorsMessages.push({
            message: 'The author has incorrect values',
            field: 'author'
        });
    }
    if (req.body.availableResolutions && req.body.availableResolutions.length) {
        const availableResolutionsArray = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
        for (let i = 0; i < req.body.availableResolutions.length; i++) {
            if (!availableResolutionsArray.includes(req.body.availableResolutions[i])) {
                errorsMessage.errorsMessages.push({
                    message: 'The available resolution has incorrect values',
                    field: 'availableResolutions'
                });
            }
        }
    }
    if (!req.body.canBeDownloaded || typeof req.body.canBeDownloaded !== 'boolean') {
        errorsMessage.errorsMessages.push({
            message: 'The can be downloaded has incorrect values',
            field: 'canBeDownloaded'
        });
    }
    if (!req.body.minAgeRestriction || req.body.minAgeRestriction < 1 || req.body.minAgeRestriction > 18) {
        errorsMessage.errorsMessages.push({
            message: 'The min age restriction has incorrect values',
            field: 'minAgeRestriction'
        });
    }
    if (!req.body.publicationDate || typeof req.body.publicationDate !== 'string' || Date.parse(req.body.publicationDate) != Date.parse(req.body.publicationDate)) {
        errorsMessage.errorsMessages.push({
            message: 'The publication date has incorrect values',
            field: 'publicationDate'
        });
    }
    if (errorsMessage.errorsMessages.length) {
        console.log('errors', errorsMessage.errorsMessages);
        res.status(400).send(errorsMessage);
        errorsMessage.errorsMessages.length = 0;
        return;
    }
    video.title = req.body.title;
    video.author = req.body.author;
    video.availableResolutions = (_a = req.body.availableResolutions) !== null && _a !== void 0 ? _a : ['P144'];
    video.canBeDownloaded = req.body.canBeDownloaded;
    video.minAgeRestriction = req.body.minAgeRestriction;
    video.publicationDate = req.body.publicationDate;
    return res.sendStatus(204);
});
exports.app.delete('/videos/:id', (req, res) => {
    for (let i = 0; i < exports.videos.length; i++) {
        if (exports.videos[i].id === +req.params.id) {
            exports.videos.splice(i, 1);
            return res.sendStatus(204);
        }
    }
    return res.sendStatus(404);
});
exports.app.delete('/testing/all-data', (req, res) => {
    exports.videos.length = 0;
    return res.sendStatus(204);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
});
