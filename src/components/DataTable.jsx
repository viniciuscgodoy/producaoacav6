import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const DataTable = ({ filteredData, maxProductionByProduct, isMachineFilterActive }) => {
  if (!filteredData || filteredData.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Dados de Produção</CardTitle>
          <CardDescription className="text-companyGray">
            {filteredData.length} registros encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-2 text-companyGray">Ano</th>
                  <th className="text-left p-2 text-companyGray">Mês</th>
                  <th className="text-left p-2 text-companyGray">Grupo</th>
                  <th className="text-left p-2 text-companyGray">Código</th>
                  <th className="text-left p-2 text-companyGray">Produto</th>
                  <th className="text-left p-2 text-companyGray">Prensa</th>
                  <th className="text-left p-2 text-companyGray">Prod. Máx</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 50).map((item, index) => {
                  const isMax = !isMachineFilterActive && 
                                 maxProductionByProduct[item.Produto] === item['Produção Máxima'];
                  return (
                    <tr key={index} className={`border-b border-white/10 hover:bg-white/10 transition-colors ${isMax ? 'bg-emerald-500/20' : ''}`}>
                      <td className="p-2 text-white">{item.Ano}</td>
                      <td className="p-2 text-white">{item.Meses}</td>
                      <td className="p-2 text-white">{item.Grupo}</td>
                      <td className="p-2 text-white">{item.Produto}</td>
                      <td className="p-2 text-white">{item.Descricao}</td>
                      <td className="p-2 text-white">{item.PRENSA}</td>
                      <td className={`p-2 font-semibold ${isMax ? 'text-emerald-300' : 'text-emerald-400'} flex items-center gap-2`}>
                        {isMax && <Star className="h-4 w-4 text-yellow-400" />}
                        {item['Produção Máxima']}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredData.length > 50 && (
              <p className="text-center text-companyGray mt-4">
                Mostrando primeiros 50 registros de {filteredData.length} encontrados
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DataTable;