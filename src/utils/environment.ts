/**
 * 环境变量配置管理
 */
export const ENV_CONFIG = {
  // API基础地址
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  
  // 应用标题
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'Default Title',
  
  // 当前环境名称
  ENV_NAME: import.meta.env.VITE_ENV_NAME || 'Unknown',
  
  // 是否启用mock数据
  MOCK_ENABLE: import.meta.env.VITE_MOCK_ENABLE === 'true',
  
  // Google Analytics ID (可选)
  ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID || undefined,
  
  // Sentry DSN (可选)
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || undefined,
  
  // Node环境
  NODE_ENV: import.meta.env.NODE_ENV || 'development'
};

/**
 * 检查是否为开发环境
 */
export const isDevelopment = () => ENV_CONFIG.NODE_ENV === 'development';

/**
 * 检查是否为生产环境
 */
export const isProduction = () => ENV_CONFIG.NODE_ENV === 'production';

/**
 * 检查是否为测试环境
 */
export const isQAS = () => ENV_CONFIG.ENV_NAME === 'QAS';