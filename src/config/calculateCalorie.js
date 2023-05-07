
const calculateCalorie = (user, setDayCalorie) => {
    const Harris_Benedict_formula = () => {
      switch (user.gender) {
        case 'Male':
          let maleCalorie = Math.round((88.36 + (13.4 * user.weight) + (4.8 * user.height) - (5.7 * user.age)) * user.activityRatio * user.goalRatio)
          setDayCalorie(maleCalorie)
          break
        case 'Female':
          let femaleCalorie = Math.round((447.6 + (9.2 * user.weight) + (3.1 * user.height) - (4.3 * user.age)) * user.activityRatio * user.goalRatio)
          setDayCalorie(femaleCalorie)
          break
        default:
          console.log('error')
          break
      }
    }
  
    Harris_Benedict_formula()
  }
  
  export default calculateCalorie;
