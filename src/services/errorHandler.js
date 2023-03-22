/*=================================
* Middelware de gestion des erreurs
*==================================*/

module.exports = (req, res) => {

  if(res.statusCode === 404)  {
    res.render('errors/404'); // j'affiche ma page d'erreur correspondant
  } else if(res.statusCode === 500) {
    res.render('errors/500'); 
  } else if(res.statusCode === 403) {
    res.render('errors/403');
  } else if(res.statusCode === 401) {
    res.render('errors/401');
  } else {
    res.render('errors/404');
  }
  
};