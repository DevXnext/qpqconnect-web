import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function BuyReqForm() {
  return (
    <> 
      <div className="mb-4">
      <Label>Enter Product / Service Name</Label>
      <Input type='text' placeholder='Text' className='xl:w-96'/>
      </div>
      <div className="mb-4">
      <Label>Name</Label>
      <Input type='text' placeholder='Text' className='xl:w-96'/>
      </div>
      <div className="mb-4">
      <Label>Mobile Number</Label>
      <Input type='number' placeholder='Text' className='xl:w-96'/>
      </div>
      <div className="mb-4">
      <Label>Tell us about your requirement</Label>
      <Textarea className='xl:w-96' placeholder='A very long line of text which is expected to span more than two to three lines so it breaks as the text increases.'/>
      </div>
      <div className='xl:w-96 text-end'>
      <Button className=''>Submit Your Requirement</Button>
      </div>
    </>
  )
}
