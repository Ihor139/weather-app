module.exports = ({ env }) => ({
  plugins: [
    require('postcss-preset-env')({ browsers: 'last 15 versions' }),
    (env === 'production') ? require('autoprefixer') : false, 
  ]
})