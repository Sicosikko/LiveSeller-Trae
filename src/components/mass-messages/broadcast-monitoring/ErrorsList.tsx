
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Error {
  type: string;
  count: number;
  examples: string[];
}

interface ErrorsListProps {
  errors: Error[];
}

const ErrorsList: React.FC<ErrorsListProps> = ({ errors }) => {
  return (
    <div>
      <h4 className="font-medium mb-2">Erros Encontrados</h4>
      <div className="space-y-2">
        {errors.map((error, index) => (
          <Alert key={index} variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="flex justify-between">
              {error.type} <span>{error.count} ocorrências</span>
            </AlertTitle>
            <AlertDescription>
              <p className="mt-1">Exemplos: {error.examples.join(", ")}</p>
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default ErrorsList;
