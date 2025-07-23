import React from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FileUpload = ({ onFileUpload, isLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="bg-white/5 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Upload className="h-5 w-5" />
            Upload da Planilha
          </CardTitle>
          <CardDescription className="text-companyGray">
            Selecione um arquivo Excel (.xls ou .xlsx) com os dados de produção
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-companyGray rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-companyGray" />
                <p className="mb-2 text-sm text-gray-300">
                  <span className="font-semibold">Clique para fazer upload</span> ou arraste o arquivo
                </p>
                <p className="text-xs text-companyGray">Excel (.xls, .xlsx)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".xls,.xlsx"
                onChange={onFileUpload}
                disabled={isLoading}
              />
            </label>
          </div>
          {isLoading && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-companyBlue/80 transition ease-in-out duration-150 cursor-not-allowed">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FileUpload;