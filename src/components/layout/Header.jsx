import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-4"
    >
      <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Sistema de Análise de Produção
      </h1>
      <p className="text-gray-300 text-lg">
        Carregue sua planilha Excel e analise os dados de produção com filtros avançados
      </p>
    </motion.div>
  );
};

export default Header;