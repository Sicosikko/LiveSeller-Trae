
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FeedbackFormProps {
  chatId: string;
  onSubmit: (rating: number, comment: string) => void;
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  chatId,
  onSubmit,
  onClose
}) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Por favor, selecione uma classificação");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(rating, comment);
      toast.success("Feedback enviado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
      toast.error("Não foi possível enviar o feedback. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
      <h3 className="text-lg font-medium mb-4">Como foi seu atendimento?</h3>
      
      <div className="flex items-center justify-center space-x-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-8 w-8 ${
                star <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
      
      <Textarea
        placeholder="Deixe um comentário sobre o atendimento (opcional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full h-24 mb-4"
      />
      
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting || rating === 0}
        >
          {isSubmitting ? "Enviando..." : "Enviar avaliação"}
        </Button>
      </div>
    </div>
  );
};

export default FeedbackForm;
