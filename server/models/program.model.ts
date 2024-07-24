import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

interface IProgramData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  suggestion: string;
}

 export interface IProgram extends Document {
  name: string;
  description: string;
  categories: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  programData: IProgramData[];
  ratings?: number;
  purchased: number;
}


const programDataSchema = new Schema<IProgramData>({
  videoUrl: String,
  videoThumbnail: Object,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  suggestion: String,
});

const programSchema = new Schema<IProgram>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories:{
    type:String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  estimatedPrice: {
    type: Number,
  },
  thumbnail: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  tags:{
    type: String,
    required: true,
  },
  level:{
    type: String,
    required: true,
  },
  demoUrl:{
    type: String,
    required: true,
  },
  benefits: [{title: String}],
  prerequisites: [{title: String}],
   programData: [programDataSchema],
   ratings:{
     type: Number,
     default: 0,
   },
   purchased:{
    type: Number,
    default: 0,
   },
},{timestamps: true});


const ProgramModel: Model<IProgram> = mongoose.model("Program", programSchema);

export default ProgramModel;
