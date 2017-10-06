package br.com.scampini.safenote.controller;

import org.junit.Test;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

/**
 * Created by romuloscampini on 10/6/17.
 *
 * @author romuloscampini
 * @since
 */
public class PagamentoControllerTest {

    @Test
    public void givenUrl_whenGetRequest_thenFindGetResponse() throws Exception{
        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.get("/api/pagamentos");
    }
}
