import useRegistrarMedico from "../../hooks/useRegistrarMedico";

export default function RegistrarMedicoModal(){

const{

form,

handleChange,

handleEspecialidad,

registrar,

especialidades,

loading

}=useRegistrarMedico();

return(

<div className="card shadow border-0">

<div className="card-header bg-success text-white">

<h4>Registrar Médico</h4>

</div>

<div className="card-body">

<div className="row g-3">

<div className="col-md-6">

<input
className="form-control"
placeholder="Primer Nombre"
name="primerNombre"
value={form.primerNombre}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<input
className="form-control"
placeholder="Segundo Nombre"
name="segundoNombre"
value={form.segundoNombre}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<input
className="form-control"
placeholder="Primer Apellido"
name="primerApellido"
value={form.primerApellido}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<input
className="form-control"
placeholder="Segundo Apellido"
name="segundoApellido"
value={form.segundoApellido}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<input
className="form-control"
placeholder="DNI"
name="dni"
value={form.dni}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<input
className="form-control"
placeholder="Edad"
type="number"
name="edad"
value={form.edad}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<input
className="form-control"
placeholder="Colegiatura"
name="numeroColegiatura"
value={form.numeroColegiatura}
onChange={handleChange}
/>

</div>

<div className="col-md-6">

<input
className="form-control"
placeholder="Contraseña"
type="password"
name="password"
value={form.password}
onChange={handleChange}
/>

</div>

<div className="col-12">

<select
className="form-select"
onChange={handleEspecialidad}
defaultValue=""
>

<option value="">

Seleccione una especialidad

</option>

{especialidades.map(e=>(

<option
key={e.idEspecialidad}
value={e.idEspecialidad}
>

{e.nombreEspecialidad}

</option>

))}

</select>

</div>

<div className="col-12">

<button

className="btn btn-success w-100"

disabled={loading}

onClick={registrar}

>

Registrar Médico

</button>

</div>

</div>

</div>

</div>

)

}