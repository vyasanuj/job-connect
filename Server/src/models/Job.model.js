import mongose, { Schema } from "mongoose" ;

const Jobschema = new Schema ({
    title: {
        type: String,
        required: true,
      },
      jobType: {
        type: String,
        required: true,
        enum: ["Full-time", "Part-time"],
      },
      location: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
        required: true,
      },
      introduction: {
        type: String,
      },
      responsibilities: {
        type: String,
        required: true,
      },
      qualifications: {
        type: String,
        required: true,
      },
      offers: {
        type: String,
      },
      salary: {
        type: String,
        required: true,
      },
      hiringMultipleCandidates: {
        type: String,
        default: "No",
        enum: ["Yes", "No"],
      },
      personalWebsite: {
        title: String,
        url: String
      },
      jobNiche: {
        type: String,
        required: true,
      },
      newsLettersSent: {
        type: Boolean,
        default: false,
      },
      jobPostedOn: {
        type: Date,
        default: Date.now,
      },
      postedBy: {
        type: mongose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }
},{timestamps : true })

export const Job = mongose.model("Job",Jobschema)