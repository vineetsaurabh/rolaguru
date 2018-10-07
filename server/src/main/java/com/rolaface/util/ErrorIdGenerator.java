package com.rolaface.util;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class ErrorIdGenerator implements IdentifierGenerator {

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {

		String prefix = "EMP";
		Connection connection = session.connection();
		try {

			PreparedStatement ps = connection
					.prepareStatement("SELECT MAX(value) as value from hibernate_tutorial.pk_table");

			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				int id = rs.getInt("vlaue");
				String code = prefix + new Integer(id).toString();
				System.out.println("Generated Stock Code: " + code);
				return code;
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

}
