import Application from "../model/applicationModel.js";
import asyncHandler from "express-async-handler";

const applicationController = {
    add: asyncHandler(async(req, res) => {
        console.log(req.body);
        const { company, role, status, date, link } = req.body;
        const statusTypes = ["applied", "interview", "offer", "rejected"];
        if(!statusTypes.includes(status)){
            throw new Error('Invalid Status: ' + status);
        }
        const duplicateApplication = await Application.findOne({company: company, role: role});
        if(duplicateApplication){
            throw new Error('Duplicate Application Detected!');
        }
        const newApplication = await Application.create(
            {
                company: company,
                role: role,
                status: status,
                date: date || Date.now(),
                link: link,
            }
        )
        res.status(201).json(newApplication);
    }),
    lists: asyncHandler(async(req, res) => {
        const listApplication = await Application.find();
        res.status(200).json(listApplication);
    }),
    getFilteredApplications: asyncHandler(async(req, res) => {
        const { startDate, endDate, status } = req.query;
        let filters = {};
        // Filterings
        if(startDate){
            filters.date = { ...filters.date, $gte: new Date(startDate)};
        }
        if(endDate){
            filters.date = { ...filters.date, $lte: new Date(endDate)};
        }
        if(status){
            filters.status = { $in: status };
        }
        const applications = await Application.find(filters).sort({ date: -1 });
        console.log(applications);
        res.json(applications);
    }),
    update: asyncHandler(async(req, res) => {
        const application = await Application.findById(req.params.id);
        if(application){
            application.status = req.body.status || application.status;
            const updatedApplication = await application.save();
            res.json(updatedApplication);
        }
    }),
    delete: asyncHandler(async(req, res) => {
        const application = await Application.findById(req.params.id);
        if(application){
            await Application.findByIdAndDelete(req.params.id);
            res.json({
                message: "Application Revoked",
            })
        }
    })
}

export default applicationController;