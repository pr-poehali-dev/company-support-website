import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface QuizQuestion {
  question: string;
  options: string[];
}

interface QuizProps {
  title: string;
  description: string;
  questions: QuizQuestion[];
  icon: string;
  gradient: string;
  onComplete: (answers: number[]) => string;
}

export default function Quiz({ title, description, questions, icon, gradient, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalResult = onComplete(newAnswers);
      setResult(finalResult);
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setResult('');
    setIsStarted(false);
  };

  if (!isStarted) {
    return (
      <Card className={`bg-gradient-to-br ${gradient} border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg`}>
        <CardHeader>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Icon name={icon as any} size={24} className="text-primary" />
          </div>
          <CardTitle className="text-lg font-heading">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">{description}</p>
          <Button onClick={handleStart} className="w-full bg-primary hover:bg-primary/90">
            <Icon name="Play" size={18} className="mr-2" />
            Начать тест
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    return (
      <Card className={`bg-gradient-to-br ${gradient} border-none shadow-lg`}>
        <CardHeader>
          <div className="w-16 h-16 rounded-2xl bg-white/90 flex items-center justify-center mb-4 shadow-md">
            <Icon name="CheckCircle" size={32} className="text-primary" />
          </div>
          <CardTitle className="text-2xl font-heading text-secondary">Результат теста</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-xl p-6 mb-6">
            <p className="text-foreground leading-relaxed whitespace-pre-line">{result}</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleReset} variant="outline" className="flex-1">
              <Icon name="RotateCcw" size={20} className="mr-2" />
              Пройти заново
            </Button>
            <Button className="flex-1">
              <Icon name="Phone" size={20} className="mr-2" />
              Получить консультацию
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-gradient-to-br ${gradient} border-none shadow-lg`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-secondary">
            Вопрос {currentQuestion + 1} из {questions.length}
          </div>
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-1 rounded-full ${
                  index <= currentQuestion ? 'bg-primary' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-xl font-heading text-secondary">
          {questions[currentQuestion].question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedOption?.toString()} onValueChange={(val) => setSelectedOption(Number(val))}>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        <div className="mt-6 flex gap-3">
          {currentQuestion > 0 && (
            <Button onClick={() => setCurrentQuestion(currentQuestion - 1)} variant="outline">
              <Icon name="ChevronLeft" size={20} className="mr-2" />
              Назад
            </Button>
          )}
          <Button onClick={handleNext} disabled={selectedOption === null} className="flex-1">
            {currentQuestion < questions.length - 1 ? 'Далее' : 'Завершить'}
            <Icon name="ChevronRight" size={20} className="ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}