import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { useToast } from '@/components/ui/use-toast';

const useProductionData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    year: '',
    month: '',
    group: '',
    productSearch: '',
    machine: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.xls') && !file.name.endsWith('.xlsx')) {
      toast({
        title: "Erro no arquivo",
        description: "Por favor, selecione um arquivo Excel (.xls ou .xlsx)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const requiredColumns = ['Ano', 'Meses', 'Grupo', 'Produto', 'Descricao', 'PRENSA', 'Produção Máxima'];
        const firstRow = jsonData.length > 0 ? jsonData[0] : {};
        const fileColumns = Object.keys(firstRow);
        
        const missingColumns = requiredColumns.filter(col => !fileColumns.includes(col));

        if (missingColumns.length > 0) {
          toast({
            title: "Erro na estrutura da planilha",
            description: `As seguintes colunas obrigatórias não foram encontradas: ${missingColumns.join(', ')}`,
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        setData(jsonData);
        setFilteredData(jsonData);
        setFilters({ year: '', month: '', group: '', productSearch: '', machine: '' });

        toast({
          title: "Sucesso!",
          description: `${jsonData.length} registros carregados com sucesso!`,
        });
      } catch (error) {
        toast({
          title: "Erro ao processar arquivo",
          description: "Não foi possível ler o arquivo Excel. Verifique se está no formato correto.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  React.useEffect(() => {
    let filtered = data;

    if (filters.year) {
      filtered = filtered.filter(item => item.Ano.toString() === filters.year);
    }
    if (filters.month) {
      filtered = filtered.filter(item => item.Meses.toString() === filters.month);
    }
    if (filters.group) {
      filtered = filtered.filter(item => item.Grupo === filters.group);
    }
    if (filters.machine) {
      filtered = filtered.filter(item => item.PRENSA.toString() === filters.machine);
    }
    if (filters.productSearch) {
      const searchTerm = filters.productSearch.toLowerCase();
      filtered = filtered.filter(item =>
        item.Descricao.toLowerCase().includes(searchTerm) ||
        item.Produto.toString().toLowerCase().includes(searchTerm)
      );
    }

    setFilteredData(filtered);
  }, [filters, data]);

  const uniqueValues = useMemo(() => {
    const uniqueYears = [...new Set(data.map(item => item.Ano))].sort((a, b) => b - a);
    const uniqueMonths = [...new Set(data.map(item => item.Meses))].sort((a, b) => a - b);
    const uniqueGroups = [...new Set(data.map(item => item.Grupo))].sort();
    const uniqueMachines = [...new Set(data.map(item => item.PRENSA))].sort((a, b) => a - b);
    return { uniqueYears, uniqueMonths, uniqueGroups, uniqueMachines };
  }, [data]);

  const stats = useMemo(() => {
    if (filteredData.length === 0) return { total: 0, avgMax: 0 };

    const total = filteredData.length;
    const sumMax = filteredData.reduce((sum, item) => sum + (Number(item['Produção Máxima']) || 0), 0);
    
    return {
      total,
      avgMax: total > 0 ? sumMax / total : 0,
    };
  }, [filteredData]);

  const maxProductionData = useMemo(() => {
    if (filteredData.length === 0) return null;
    return filteredData.reduce((max, current) => {
      return (Number(current['Produção Máxima']) || 0) > (Number(max['Produção Máxima']) || 0) ? current : max;
    });
  }, [filteredData]);

  const maxProductionByProduct = useMemo(() => {
    if (filters.machine) return {};

    const maxValues = {};
    filteredData.forEach(item => {
      const productId = item.Produto;
      const production = Number(item['Produção Máxima']) || 0;
      if (!maxValues[productId] || production > maxValues[productId]) {
        maxValues[productId] = production;
      }
    });
    return maxValues;
  }, [filteredData, filters.machine]);

  return {
    data,
    filteredData,
    filters,
    setFilters,
    isLoading,
    handleFileUpload,
    uniqueValues,
    stats,
    maxProductionData,
    maxProductionByProduct,
  };
};

export default useProductionData;