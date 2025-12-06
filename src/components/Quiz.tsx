"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dumbbell, ArrowRight } from "lucide-react";

interface QuizData {
  weight: string;
  height: string;
  age: string;
  gender: string;
  goal: "bulking" | "cutting";
  level: "beginner" | "intermediate" | "advanced";
}

interface QuizProps {
  onComplete: (data: QuizData) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<QuizData>>({});

  const questions = [
    {
      title: "Qual seu peso atual?",
      description: "Em quilogramas",
      field: "weight" as keyof QuizData,
      type: "input",
      placeholder: "Ex: 75",
      unit: "kg"
    },
    {
      title: "Qual sua altura?",
      description: "Em centímetros",
      field: "height" as keyof QuizData,
      type: "input",
      placeholder: "Ex: 175",
      unit: "cm"
    },
    {
      title: "Qual sua idade?",
      description: "Para calcular seu metabolismo",
      field: "age" as keyof QuizData,
      type: "input",
      placeholder: "Ex: 25",
      unit: "anos"
    },
    {
      title: "Qual seu gênero?",
      description: "Para personalizar melhor seu plano",
      field: "gender" as keyof QuizData,
      type: "radio",
      options: [
        { value: "male", label: "Masculino" },
        { value: "female", label: "Feminino" },
        { value: "other", label: "Outro" }
      ]
    },
    {
      title: "Qual seu objetivo?",
      description: "Escolha o que você quer alcançar",
      field: "goal" as keyof QuizData,
      type: "radio",
      options: [
        { value: "bulking", label: "Ganho de Massa Muscular" },
        { value: "cutting", label: "Perda de Peso" }
      ]
    },
    {
      title: "Qual seu nível de experiência?",
      description: "Quanto tempo você já treina?",
      field: "level" as keyof QuizData,
      type: "radio",
      options: [
        { value: "beginner", label: "Iniciante (menos de 6 meses)" },
        { value: "intermediate", label: "Intermediário (6 meses a 2 anos)" },
        { value: "advanced", label: "Avançado (mais de 2 anos)" }
      ]
    }
  ];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Complete quiz
      onComplete(data as QuizData);
    }
  };

  const handleInputChange = (field: keyof QuizData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const currentQuestion = questions[step];
  const isLastStep = step === questions.length - 1;
  const canProceed = data[currentQuestion.field] && data[currentQuestion.field]!.toString().trim() !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-900/50 border-slate-800">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white mb-2">Personalize seu FitBoost</CardTitle>
          <CardDescription className="text-slate-400">
            Responda algumas perguntas para receber recomendações personalizadas
          </CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= step ? "bg-orange-500" : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">{currentQuestion.title}</h3>
            <p className="text-slate-400">{currentQuestion.description}</p>
          </div>

          {currentQuestion.type === "input" && (
            <div className="space-y-2">
              <Label htmlFor={currentQuestion.field} className="text-slate-300">
                {currentQuestion.field === "weight" ? "Peso" :
                 currentQuestion.field === "height" ? "Altura" :
                 currentQuestion.field === "age" ? "Idade" : ""}
              </Label>
              <div className="relative">
                <Input
                  id={currentQuestion.field}
                  type="number"
                  placeholder={currentQuestion.placeholder}
                  value={data[currentQuestion.field] || ""}
                  onChange={(e) => handleInputChange(currentQuestion.field, e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white pr-12"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                  {currentQuestion.unit}
                </span>
              </div>
            </div>
          )}

          {currentQuestion.type === "radio" && (
            <RadioGroup
              value={data[currentQuestion.field] || ""}
              onValueChange={(value) => handleInputChange(currentQuestion.field, value)}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} className="border-slate-600" />
                  <Label htmlFor={option.value} className="text-slate-300 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="ghost"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="text-slate-400 hover:text-white"
            >
              Voltar
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-gradient-to-r from-orange-500 to-pink-600 hover:opacity-90"
            >
              {isLastStep ? "Finalizar" : "Próximo"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}