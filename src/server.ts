import express  from "express";
import { z, ZodError } from "zod";
import {SNS} from "aws-sdk";

const app = express();
app.use(express.json())

app.post("/nfe", async(req, res) => {
    const requestBodySchema = z.object({
        url: z.string().url()
    });

    try{
        const { url } = requestBodySchema.parse(req.body);
        const sns = new SNS({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
            region: "us-east-1",
        });

       const {MessageId} = await sns.publish({
            Message: JSON.stringify({ url }),
            TopicArn: process.env.AWS_TOPIC_ARN,
            MessageGroupId: "01"
        }).promise()

        if(!MessageId) {
            throw Error("Falha ao publicar mensagem SNS")
        }

        return res.status(201).json({ success: true });

    }catch(err: unknown){
        console.log(err);
        
        if(err instanceof ZodError){
            return res.status(400).json({
                message: err.format()
            })
        }
        return res.status(500).json({message: "Internal Server Error"});
    }


    return res.status(200).json({
        message: "Hello World",
    });
});

app.listen(Number(process.env.PORT), () => {
    console.log(`Aplicação rodando na porta ${process.env.PORT}`);
    
});
