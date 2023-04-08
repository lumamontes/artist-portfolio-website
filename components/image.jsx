export default function ImageSlice({slice}) {
    return (
      slice.items.length > 0 && slice.items.map(item => (
        <div key={slice.id} className="group/post transition-opacity hover:bg-slate-100 hover:opacity-90 hover:pb-6">
          <img src={item.image.url} alt={item.image.alt || item.name} className="rounded" />
          <a className="group/edit invisible group-hover/post:visible ..." >
            <span className="self-end">{item.name}</span>
          </a>
        </div>
      ))
    );
  }
  
  
  
  
  
  