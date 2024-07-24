import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IProgram extends Document {
  id: number
  name: string
  session: Session[]
}


interface Session extends Document {
  sessionNumber: number
  warmup?: string
  instructions: string
  exercises: Exercise[]
  sessionType?: string
}
interface Exercise {
  exerciseNumber: number
  exerciseName: string
  exerciseDescription: string
  image: string
  weeks: Week[]
}

interface Week {
  weekNumber: number
  sets: number
  reps?: string[]
  rest?: string[]
  duration?: string[]
}

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

const ProgramModel: Model<IProgram> = mongoose.model("Program", programSchema);

export default ProgramModel;
