import {React,useState} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Loader2Icon, Sparkle } from 'lucide-react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
function AddNewCourseDialog({children}) {
    const [loading,setLoading]=useState(false);
    const courseId=uuidv4();
    const [formData , setFormData ] = useState({
        courseName:'',
        description:'',
        n_chapters:0,
        includeVideo:false,
        difficulty:'Beginner',
        category:"coding",
    });
    const onHandleInputChange=(field,value)=>{
        setFormData((prevData)=>({
            ...prevData,
            [field]:value
        }))
        console.log(formData);
    }
    const router=useRouter();
    const onGenerate=async()=>{
        // Basic validation
        if (!formData.courseName.trim()) {
            alert('Please enter a course name');
            return;
        }
        if (formData.n_chapters <= 0) {
            alert('Please enter a valid number of chapters');
            return;
        }
        
        console.log(formData);
        setLoading(true);
        try {
            const result=await axios.post('/api/generate-course',{
                ...formData,
                courseId:courseId
            });
            console.log('API Response:', result);
            if(result?.data?.resp=='limit reached'){
                toast.error('You have reached the limit of courses you can create. Please upgrade your plan to create more courses.');
                router.push('/workspace/billing');
                return;
            }
            console.log('Redirecting to:', `/workspace/course-edit/${courseId}`);
            router.push(`/workspace/edit-course/${courseId}`);
        } catch (error) {
            console.error('Error generating course:', error);
        } finally {
            setLoading(false);
        }
    }
  return (
   <Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Course using AI</DialogTitle>
      <DialogDescription asChild>
        <div className='flex flex-col gap-4'>
            <div>
                <label > Course Name</label>
                <Input placeholder="Course Name" onChange={(event)=> onHandleInputChange('courseName',event?.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Course Description (Optional)</label>
                <Textarea placeholder="Course Description" onChange={(event)=> onHandleInputChange('description',event?.target.value)}/>
            </div>
            <div>
                <label htmlFor="">No. of Chapters</label>
                <Input placeholder="No. of Chapters. " type={'number'} onChange={(event)=> onHandleInputChange('n_chapters', parseInt(event?.target.value) || 0)}/>
            </div>
            <div className='flex items-center gap-4'>
                <label htmlFor="">Include Video</label>
                <Switch 
                onCheckedChange={()=>onHandleInputChange('includeVideo',!formData?.includeVideo)}/>
            </div>
            <div>
                <label htmlFor="">Difficulty</label>
                <Select onValueChange={(value)=> onHandleInputChange('difficulty',value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div>
                <label htmlFor="">Category</label>
                <Input placeholder="Category"  onChange={(event)=> onHandleInputChange('category', event?.target.value )}/>
            </div>
            <div className='mt-5'>
                <Button className={'w-full'} onClick={onGenerate} disabled={loading}> 
                    {loading ? <Loader2Icon className="animate-spin" /> : <Sparkle/>} 
                    Generate Course
                </Button>
            </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default AddNewCourseDialog