package com.example.backend.model;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class CommonResponse {

    private boolean success;
    private int code;
    private String msg;

    private enum CommonResult {
        SUCCESS(0, "success"),
        FAIL(-1, "fail");

        int code;
        String msg;


        CommonResult(int code, String msg) {

            this.code = code;
            this.msg = msg;
        }

        private int getCode() {
            return code;
        }
        private String getMsg() {
            return msg;
        }
    }

    public static CommonResponse successResult() {
        CommonResponse result = new CommonResponse();
        result.setSuccess(true);
        result.setCode(CommonResult.SUCCESS.getCode());
        result.setMsg(CommonResult.SUCCESS.getMsg());

        return result;
    }

    public static CommonResponse failResult(String trace) {
        CommonResponse result = new CommonResponse();
        result.setSuccess(false);
        result.setCode(CommonResult.FAIL.getCode());
        result.setMsg(CommonResult.FAIL.getMsg()+" : "+trace);
        return result;
    }
}
