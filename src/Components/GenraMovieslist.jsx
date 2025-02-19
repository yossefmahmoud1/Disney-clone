import Genralist from '../Constatnt/GenralList'
import Movielist from './Movielist'

const GenraMovieslist = () => {
  return (
    <div>
      {Genralist.genere.map((genra,index)=>index<=4&&(
<div key={genra.index} className='p-8 px-8 md:16px'>
<h2 className='text-[20px] text-white font-bold'>{genra.name}</h2>
<Movielist key={index} index_i={index} id={genra.id}/>
</div>

      ))}
    </div>
  )
}

export default GenraMovieslist
