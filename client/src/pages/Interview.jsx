import React, { useState } from 'react'
import Step1SetUp from '../components/Step1SetUp';
import { data } from 'react-router-dom';
import Step2Interview from '../components/Step2Interview';
import Step3Report from '../components/Step3Report';

const Interview = () => {
  const [step, setStep] = useState(1);
  const [interviewData, setInterviewData] = useState(null);

  return (
    <div>
      {
        step === 1 && (
          <Step1SetUp onStart={(date)=>{
            setInterviewData(data);
            setStep(2)
          }}/>
        )
      }
      {
        step === 2 && (
          <Step2Interview interviewData={interviewData} onFinish={(report) => {setInterviewData(report); setStep(2)}} />
        )
      }
      {
        step === 3 && (
          <Step3Report report={interviewData}/>
        )
      }
    </div>
  )
}

export default Interview