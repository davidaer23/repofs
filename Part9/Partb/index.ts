import express from "express";
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height= Number(req.query.height);
    const weight= Number(req.query.weight);
    const bmi= calculateBmi( height, weight);
    if(!height || !weight){
      res.send({
        error: "malformatted parameters"
      });  
    }
    res.send({
      weight: weight,
      height: height,
      bmi: bmi
    });
  });


  app.post('/exercise', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
    const { daily_exercises, target } = req.body;

    if ( !daily_exercises || !target ) {
      return res.status(400).send({ error: 'parameters missing'});
    }

    if ( isNaN(Number(target))) {
      return res.status(400).send({ error: 'malformatted parameters'});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(Number(target),  daily_exercises);
    return res.json(result);
  });

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});