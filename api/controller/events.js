export const creatEvent = async (req,res,next)=> {
  const userId = req.user;
  console.log(userId);
  
  
  return userId;
}