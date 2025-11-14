import { useState } from "react";
import * as reviewService from "../services/reviewService";

export function useComment() {
  const [comment, setComment] = useState<string>("");

  function tryValidateComment(): { isValid: boolean; errors: string[] } {
    const validation = reviewService.validateComment(comment);

    return validation;
  }

  return {
    comment,
    setComment,
    tryValidateComment,
  };
}
