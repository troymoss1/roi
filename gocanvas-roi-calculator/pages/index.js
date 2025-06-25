import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function GoCanvasROICalculator() {
  const [inputs, setInputs] = useState({
    employees: '',
    formsPerDay: '',
    wage: '',
    fillTime: '',
    retypeWage: '',
    retypeTime: '',
    formErrors: '',
    costPerError: ''
  });

  const [roi, setRoi] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const calculateROI = () => {
    const {
      employees,
      formsPerDay,
      wage,
      fillTime,
      retypeWage,
      retypeTime,
      formErrors,
      costPerError
    } = inputs;

    const numEmployees = parseFloat(employees);
    const forms = parseFloat(formsPerDay);
    const empWage = parseFloat(wage);
    const timeFilling = parseFloat(fillTime);
    const retWage = parseFloat(retypeWage);
    const timeRetyping = parseFloat(retypeTime);
    const errors = parseFloat(formErrors);
    const errorCost = parseFloat(costPerError);

    const dailyCostFilling = numEmployees * forms * (timeFilling / 60) * empWage;
    const dailyCostRetyping = numEmployees * forms * (timeRetyping / 60) * retWage;
    const dailyCostErrors = errors * errorCost;

    const totalDailyCost = dailyCostFilling + dailyCostRetyping + dailyCostErrors;
    const annualCost = totalDailyCost * 260; // assuming 260 working days

    setRoi(annualCost.toFixed(2));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 font-sans text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-[#005cb9]">GoCanvas ROI Calculator</h1>
      <Card className="mb-4 border border-[#005cb9] shadow-md">
        <CardContent className="space-y-4">
          {[
            { label: 'Number of employees filling out paper forms', name: 'employees' },
            { label: 'Forms filled out per employee per day', name: 'formsPerDay' },
            { label: 'Average hourly wage of employee (USD/hour)', name: 'wage' },
            { label: 'Minutes spent filling out each form', name: 'fillTime' },
            { label: 'Hourly wage of person retyping into system (USD/hour)', name: 'retypeWage' },
            { label: 'Minutes spent retyping each form', name: 'retypeTime' },
            { label: 'Number of form errors per day', name: 'formErrors' },
            { label: 'Estimated cost per form error (USD)', name: 'costPerError' }
          ].map(({ label, name }) => (
            <div key={name}>
              <Label className="text-sm font-medium text-[#333]">{label}</Label>
              <Input type="number" step="any" name={name} value={inputs[name]} onChange={handleChange} className="border border-[#ccc] rounded-md p-2 w-full" />
            </div>
          ))}
          <Button onClick={calculateROI} className="bg-[#005cb9] text-white hover:bg-[#004a94]">Calculate ROI</Button>
        </CardContent>
      </Card>
      {roi && (
        <div className="text-xl font-semibold text-green-700">
          Estimated Annual Cost of Inaction: ${roi}
        </div>
      )}
    </div>
  );
}
