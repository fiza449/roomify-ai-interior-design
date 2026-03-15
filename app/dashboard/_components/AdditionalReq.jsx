import React from 'react'
import { Textarea } from "@/components/ui/textarea"

function AdditionalReq({additionalReqInput}) {
  return (
	<div>
		<label className='text-gray-400' >Enter Additional Requirements (Optional)</label>
	  	<Textarea className='mt-2' onChange={(e) => additionalReqInput(e.target.value)} />
	</div>
  )
}

export default AdditionalReq
