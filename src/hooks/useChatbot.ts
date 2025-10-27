import { useState, useCallback } from 'react';

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const openChatbot = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChatbot = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    toggleChatbot,
    openChatbot,
    closeChatbot
  };
}