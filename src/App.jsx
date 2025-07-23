import React, { useState, useEffect, useMemo } from 'react';
import { Upload, Filter, Search, TrendingUp, Settings, BarChart3 } from 'lucide-react';
import * as XLSX from 'xlsx';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    year: '',
    month: '',
    group: '',
    description: '',
    prensa: ''
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Extract unique values for dropdowns
  const uniqueYears = useMemo(() => [...new Set(data.map(item => item.Ano))].sort(), [data]);
  const uniqueMonths = useMemo(() => [...new Set(data.map(item => item.Meses))].sort((a, b) => a - b), [data]);
  const uniqueGroups = useMemo(() => [...new Set(data.map(item => item.Grupo))].sort(), [data]);
  const uniquePrensas = useMemo(() => [...new Set(data.map(item => item.PRENSA))].sort(), [data]);
  
  // Get month name in Portuguese
  const getMonthName = (monthNumber) => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return months[monthNumber - 1] || monthNumber;
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // Clean and validate data
      const cleanData = jsonData.map((row, index) => ({
        id: index,
        Ano: row.Ano || row.ano,
        Meses: Number(row.Meses || row.meses),
        Grupo: row.Grupo || row.grupo || '',
        Produto: row.Produto || row.produto || '',
        Descricao: row.Descricao || row.descricao || row.Descrição || row.descrição || '',
        PRENSA: row.PRENSA || row.prensa || '',
        'Produção Máxima': Number(row['Produção Máxima'] || row['Producao Maxima'] || row['produção máxima'] || 0),
        'Produção Mínima': Number(row['Produção Mínima'] || row['Producao Minima'] || row['produção mínima'] || 0),
        'Produção Média': Number(row['Produção Média'] || row['Producao Media'] || row['produção média'] || 0)
      }));

      setData(cleanData);
      setFilteredData(cleanData);
    } catch (error) {
      alert('Erro ao processar o arquivo. Verifique se é um arquivo Excel válido.');
      console.error('Error processing file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle description input with suggestions
  const handleDescriptionChange = (value) => {
    setFilters(prev => ({ ...prev, description: value }));
    
    if (value.length > 0) {
      const filtered = [...new Set(data
        .filter(item => item.Descricao.toLowerCase().includes(value.toLowerCase()))
        .map(item => item.Descricao))]
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = data;

    if (filters.year) {
      filtered = filtered.filter(item => item.Ano == filters.year);
    }
    if (filters.month) {
      filtered = filtered.filter(item => item.Meses == filters.month);
    }
    if (filters.group) {
      filtered = filtered.filter(item => item.Grupo.toLowerCase().includes(filters.group.toLowerCase()));
    }
    if (filters.description) {
      filtered = filtered.filter(item => item.Descricao.toLowerCase().includes(filters.description.toLowerCase()));
    }
    if (filters.prensa) {
      filtered = filtered.filter(item => String(item.PRENSA).toLowerCase().includes(filters.prensa.toLowerCase()));
    }

    setFilteredData(filtered);
  }, [filters, data]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (filteredData.length === 0) return null;

    const maxProduction = Math.max(...filteredData.map(item => item['Produção Máxima']));
    const maxProductionItem = filteredData.find(item => item['Produção Máxima'] === maxProduction);
    const totalProducts = filteredData.length;

    return {
      maxProduction,
      maxProductionItem,
      totalProducts
    };
  }, [filteredData]);

  // Clear filters
  const clearFilters = () => {
    setFilters({ year: '', month: '', group: '', description: '', prensa: '' });
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Sistema de Análise de Produção Industrial</h1>
          </div>
          
          {/* File Upload */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
              <Upload className="h-5 w-5" />
              Carregar Planilha Excel
              <input
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {data.length > 0 && (
              <span className="text-sm text-gray-600">
                {data.length} registros carregados
              </span>
            )}
            {isLoading && (
              <span className="text-sm text-blue-600">Processando arquivo...</span>
            )}
          </div>
        </div>

        {data.length > 0 && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Filtros</h2>
                <button
                  onClick={clearFilters}
                  className="ml-auto text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Limpar Filtros
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ano</label>
                  <select
                    value={filters.year}
                    onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todos os anos</option>
                    {uniqueYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Month Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mês</label>
                  <select
                    value={filters.month}
                    onChange={(e) => setFilters(prev => ({ ...prev, month: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todos os meses</option>
                    {uniqueMonths.map(month => (
                      <option key={month} value={month}>{getMonthName(month)}</option>
                    ))}
                  </select>
                </div>

                {/* Group Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grupo</label>
                  <select
                    value={filters.group}
                    onChange={(e) => setFilters(prev => ({ ...prev, group: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todos os grupos</option>
                    {uniqueGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                {/* Description Filter with Autocomplete */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrição do Produto</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={filters.description}
                      onChange={(e) => handleDescriptionChange(e.target.value)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      placeholder="Digite para buscar..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                    />
                    <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setFilters(prev => ({ ...prev, description: suggestion }));
                              setShowSuggestions(false);
                            }}
                            className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Prensa Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Máquina (Prensa)</label>
                  <select
                    value={filters.prensa}
                    onChange={(e) => setFilters(prev => ({ ...prev, prensa: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Todas as máquinas</option>
                    {uniquePrensas.map(prensa => (
                      <option key={prensa} value={prensa}>{prensa}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8" />
                    <div>
                      <p className="text-blue-100">Produção Máxima</p>
                      <p className="text-2xl font-bold">{stats.maxProduction.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <div className="flex items-center gap-3">
                    <Settings className="h-8 w-8" />
                    <div>
                      <p className="text-green-100">Máquina</p>
                      <p className="text-2xl font-bold">{stats.maxProductionItem?.PRENSA}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-8 w-8" />
                    <div>
                      <p className="text-purple-100">Total de Produtos</p>
                      <p className="text-2xl font-bold">{stats.totalProducts}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Resultados da Produção ({filteredData.length} registros)
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ano/Mês</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Máquina</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prod. Máxima</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-gray-50 ${item["Produção Máxima"] === stats?.maxProduction ? "bg-green-50 border-green-200" : ""}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.Ano}/{getMonthName(item.Meses)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.Grupo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.Produto}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.Descricao}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.PRENSA}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${item["Produção Máxima"] === stats?.maxProduction ? "text-green-600" : "text-gray-900"}`}>
                          {item["Produção Máxima"].toLocaleString()}
                          {item["Produção Máxima"] === stats?.maxProduction && (
                            <span className="ml-1 text-green-500">🏆</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredData.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Nenhum resultado encontrado com os filtros aplicados.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {data.length === 0 && !isLoading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Upload className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Carregue sua planilha para começar</h3>
            <p className="text-gray-600">
              Faça upload de um arquivo Excel (.xls ou .xlsx) com os dados de produção para análise.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;