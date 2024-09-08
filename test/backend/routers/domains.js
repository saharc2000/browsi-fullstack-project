import express from "express";
import {publishers} from "../server.js";

const domainsRouter = express.Router();

domainsRouter.get("/", (req, res) => {
    const allDomains = publishers.flatMap(publisher => publisher.domains);
    res.status(200).json(allDomains);
});

export default domainsRouter;
