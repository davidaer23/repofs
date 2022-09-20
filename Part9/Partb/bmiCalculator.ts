
interface bmiValues {
    height: number;
    weight: number;
  }


// const a: number = Number(process.argv[2])
// const b: number = Number(process.argv[3])



const parseArguments = (args: Array<string>): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  export const calculateBmi = (height: number, weight: number): string => {
    height/=100
    const bmi= weight/(height*height);

    if(bmi < 18.5){
        return  'Underweigth'
    }

    if(bmi >= 18.5 && bmi < 25){
        return 'Normal (healthy weight)'
    }

    if(bmi >= 25 && bmi < 30){
        return 'Overweigth'
    }

    if(bmi >= 30 ){
        return 'Obesity'
    }

    return 'has'
}

  
  try {
    const { height, weight } = parseArguments(process.argv);
    calculateBmi(height, weight);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }