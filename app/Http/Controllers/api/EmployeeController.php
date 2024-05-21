<?php

namespace App\Http\Controllers\api;

use App\Models\Employee;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;


use Illuminate\Support\Facades\Validator;


class EmployeeController extends Controller

{
    public function index(){

$employee = Employee::all();

if($employee->count() > 0){

return response()-> json([
    'status' => 200,
    'employee' => $employee
], 200);


}else{
    return response()-> json([
        'status' => 404,
        'message' => 'No records found'
    ], 404);

}

    }


    public function store(Request $request){

        $validator = Validator::make($request->all(), [

            'name' => 'required|string|max:191',
            'gender' => 'required|string|max:191',
            'email' => 'required|email|max:191',
            'phone' => 'required|digits:10',


        ]);
      
        if($validator->fails()){

return response()->json([
'status' => 422,
'errors' => $validator->messages()


],422);
        }else{

            $employee = Employee::create([

                'name' => $request->name,
                'gender' => $request->gender,
                'email' => $request->email,
                'phone' => $request->phone,

            ]);

            if($employee){
                return response()->json([
                    'status' => 200,
                    'message' => "Employee created successfully",
                ],200);

            }else{
                return response()->json([
                    'status' => 500,
                    'message' => "Something went wrong",
                ],500);

            }
        }
        
            }

            public function show($id){

                $employee = Employee::find($id);
if($employee){

    return response()->json([
        'status' => 200,
        'employee' => $employee
    ],200);

}else{
    return response()->json([
        'status' => 404,
        'message' => "No such Employee found"
    ],404);


}


            }



            public function edit($id){

                $employee = Employee::find($id);
                if($employee){
                
                    return response()->json([
                        'status' => 200,
                        'Employee' => $employee
                    ],200);
                
                }else{
                    return response()->json([
                        'status' => 404,
                        'message' => "No such Employee found"
                    ],404);
                
                
                }



            }

            public function update(Request $request, int $id){

                $validator = Validator::make($request->all(), [

                    'name' => 'required|string|max:191',
                    'gender' => 'required|string|max:191',
                    'email' => 'required|email|max:191',
                    'phone' => 'required|digits:10',
        
        
                ]);
              
                if($validator->fails()){
        
        return response()->json([
        'status' => 422,
        'errors' => $validator->messages()
        
        
        ],422);
                }else{
        

                    $employee = Employee::find($id);
                   
        
                    if($employee){

                        $employee->update([
        
                            'name' => $request->name,
                            'gender' => $request->gender,
                            'email' => $request->email,
                            'phone' => $request->phone,
            
                        ]);

                        return response()->json([
                            'status' => 200,
                            'message' => "Employee updated successfully",
                        ],200);
        
                    }else{
                        return response()->json([
                            'status' => 404,
                            'message' => "No such Employee found!",
                        ],404);
        
                    }
                }

            }

            public function destroy($id){

                $employee = Employee::find($id);

if($employee){

    $employee->delete();
    return response()->json([
        'status' => 200,
        'message' => "Employee deleted successfully!",
    ],200);

}else{
    return response()->json([
        'status' => 404,
        'message' => "No such Employee found!",
    ],404);

}


            }

}

