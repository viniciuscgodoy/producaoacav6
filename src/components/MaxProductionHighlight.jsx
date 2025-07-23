import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MaxProductionHighlight = ({ maxProductionData }) => {
  if (!maxProductionData) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-lg border-emerald-400/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Trophy className="h-5 w-5 text-yellow-300" />
            Maior Produção Encontrada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Produto</p>
              <p className="text-lg font-semibold text-white">{maxProductionData.Descricao}</p>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Código: {maxProductionData.Produto}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Produção Máxima</p>
              <p className="text-3xl font-bold text-emerald-400">{maxProductionData['Produção Máxima']}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">Máquina (Prensa)</p>
              <div className='flex items-center gap-2'>
                <Factory className="h-6 w-6 text-white"/>
                <p className="text-xl font-semibold text-white">Prensa {maxProductionData.PRENSA}</p>
              </div>
              <Badge variant="outline" className="border-emerald-400 text-emerald-400">
                {maxProductionData.Grupo}
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-300">
            <span>Ano: {maxProductionData.Ano}</span>
            <span>Mês: {new Date(2024, maxProductionData.Meses - 1).toLocaleDateString('pt-BR', { month: 'long' })}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MaxProductionHighlight;